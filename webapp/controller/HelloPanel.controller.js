sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], (Controller, MessageToast) => {
    "use strict";
 
    return Controller.extend("ui5.walkthrough.controller.HelloPanel", {
       onShowHello() {
            var name = this.getView().getModel().getProperty("/recipient/name");
            // show a native JavaScript alert
            MessageToast.show(`Hello ${name}`);

            // read msg from i18n model
            const oBundle = this.getView().getModel("i18n").getResourceBundle();
            const sRecipient = this.getView().getModel().getProperty("/recipient/name");
            const sMsg = oBundle.getText("helloMsg", [sRecipient]);

            // show message
            MessageToast.show(sMsg);
       },

       //via async & await
       async onOpenDialog1() {
         // create dialog lazily
         this.oDialog ??= await this.loadFragment({
             name: "ui5.walkthrough.view.HelloDialog"
         });
     
         this.oDialog.open();
       },

       //via Promise & then
       onOpenDialog2() {
         if(!this.dialogPromise) {
            this.dialogPromise = this.loadFragment({
               name: "ui5.walkthrough.view.HelloDialog",
               id: "dialog2"
            });
         }
         this.dialogPromise.then((dialog) => 
            dialog.open()
         )
      },

      onCloseDialog() {
			// note: We don't need to chain to the pDialog promise, since this event handler
			// is only called from within the loaded dialog itself.
			this.byId("helloDialog")?.close();
			this.byId("dialog2--helloDialog")?.close();
		}

    });
 });