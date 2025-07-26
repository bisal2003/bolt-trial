@@ .. @@
 import React from 'react';
 import { Outlet } from 'react-router-dom';
 import Sidebar from './Sidebar';
 import Header from './Header';
+import MobileNavigation from './MobileNavigation';
 
 const Layout = () => {
   return (
-    <div className="flex h-screen bg-gray-50">
+    <div className="flex min-h-screen bg-gray-50">
       <Sidebar />
       <div className="flex-1 flex flex-col overflow-hidden">
         <Header />
-        <main className="flex-1 overflow-auto">
+        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
           <Outlet />
         </main>
       </div>
+      <MobileNavigation />
     </div>
   );
 };