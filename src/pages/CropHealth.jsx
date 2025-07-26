@@ .. @@
 import React, { useState } from 'react';
-import { Camera, Upload, Send, Mic, MicOff } from 'lucide-react';
+import { Camera, Upload, Send, Mic, MicOff, X, CheckCircle } from 'lucide-react';
 import useAppStore from '../store/appStore';
 import { getTranslation } from '../utils/translations';
 import { callGeminiAPI } from '../utils/gemini';
+import LoadingSpinner from '../components/Common/LoadingSpinner';
 
 const CropHealth = () => {
   const { selectedLanguage } = useAppStore();
@@ .. @@
   const [userQuestion, setUserQuestion] = useState('');
   const [isListening, setIsListening] = useState(false);
   const [showQuestionInput, setShowQuestionInput] = useState(false);
+  const [dragActive, setDragActive] = useState(false);
+
+  const handleDrag = (e) => {
+    e.preventDefault();
+    e.stopPropagation();
+    if (e.type === "dragenter" || e.type === "dragover") {
+      setDragActive(true);
+    } else if (e.type === "dragleave") {
+      setDragActive(false);
+    }
+  };
+
+  const handleDrop = (e) => {
+    e.preventDefault();
+    e.stopPropagation();
+    setDragActive(false);
+    
+    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
+      const file = e.dataTransfer.files[0];
+      if (file.type.startsWith('image/')) {
+        processImageFile(file);
+      }
+    }
+  };
+
+  const processImageFile = (file) => {
+    const reader = new FileReader();
+    reader.onload = (e) => {
+      setSelectedImage({
+        file,
+        url: e.target.result,
+        base64: e.target.result.split(',')[1]
+      });
+      // Auto-analyze after selecting image
+      analyzeCrop(e.target.result.split(',')[1]);
+    };
+    reader.readAsDataURL(file);
+  };
 
   const handleImageUpload = (event) => {
     const file = event.target.files[0];
     if (file) {
-      const reader = new FileReader();
-      reader.onload = (e) => {
-        setSelectedImage({
-          file,
-          url: e.target.result,
-          base64: e.target.result.split(',')[1]
-        });
-        // Auto-analyze after selecting image
-        analyzeCrop(e.target.result.split(',')[1]);
-      };
-      reader.readAsDataURL(file);
+      processImageFile(file);
     }
   };
@@ .. @@
       {/* Image Upload Area */}
       <div className="mb-8">
         <div className={`
-          relative border-2 border-dashed rounded-xl p-8 text-center transition-colors
-          ${selectedImage ? 'border-primary-300 bg-primary-50' : 'border-gray-300 hover:border-gray-400'}
+          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
+          ${selectedImage 
+            ? 'border-primary-300 bg-primary-50' 
+            : dragActive 
+            ? 'border-primary-500 bg-primary-50' 
+            : 'border-gray-300 hover:border-gray-400'
+          }
         `}>
           {selectedImage ? (
             <div className="space-y-4">
+              <div className="relative inline-block">
+                <button
+                  onClick={resetAnalysis}
+                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
+                >
+                  <X className="h-3 w-3" />
+                </button>
+              </div>
               <img
                 src={selectedImage.url}
                 alt="Selected crop"
-                className="max-h-64 mx-auto rounded-lg shadow-md"
+                className="max-h-64 mx-auto rounded-lg shadow-md object-cover"
               />
               <p className="text-sm text-gray-600">{selectedImage.file.name}</p>
+              {diagnosis && (
+                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
+                  <CheckCircle className="h-4 w-4 mr-1" />
+                  Analysis Complete
+                </div>
+              )}
             </div>
           ) : (
             <div className="space-y-4">
               <Camera className="h-16 w-16 text-gray-400 mx-auto" />
               <div>
                 <p className="text-lg font-medium text-gray-900 mb-2">
-                  {getTranslation(selectedLanguage, 'noImageSelected')}
+                  {dragActive ? 'Drop image here' : getTranslation(selectedLanguage, 'noImageSelected')}
                 </p>
                 <p className="text-gray-600">
-                  Click to upload or drag and drop an image
+                  Click to upload, drag and drop, or paste an image
                 </p>
               </div>
             </div>
           )}
           
           <input
             type="file"
             accept="image/*"
             onChange={handleImageUpload}
             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
+            onDragEnter={handleDrag}
+            onDragLeave={handleDrag}
+            onDragOver={handleDrag}
+            onDrop={handleDrop}
           />
         </div>
@@ .. @@
       {/* Analysis Section */}
       {isAnalyzing && (
         <div className="card text-center mb-8">
-          <div className="loading-dots mx-auto mb-4">
-            <div></div>
-            <div></div>
-            <div></div>
-            <div></div>
-          </div>
+          <LoadingSpinner size="lg" />
           <h3 className="text-lg font-semibold text-gray-900 mb-2">
             {getTranslation(selectedLanguage, 'analyzingCrop')}
           </h3>
           <p className="text-gray-600">
             {userQuestion.trim() 
               ? 'Analyzing your crop and considering your specific question'
               : 'Our AI is examining the image for diseases and health issues'
             }
           </p>
         </div>
       )}