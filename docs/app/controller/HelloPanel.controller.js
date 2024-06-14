sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast"],(e,o)=>{"use strict";return e.extend("ui5.walkthrough.controller.HelloPanel",{onShowHello(){var e=this.getView().getModel().getProperty("/recipient/name");o.show(`Hello ${e}`);const i=this.getView().getModel("i18n").getResourceBundle();const l=this.getView().getModel().getProperty("/recipient/name");const t=i.getText("helloMsg",[l]);o.show(t)},async onOpenDialog1(){this.oDialog??=await this.loadFragment({name:"ui5.walkthrough.view.HelloDialog"});this.oDialog.open()},onOpenDialog2(){if(!this.dialogPromise){this.dialogPromise=this.loadFragment({name:"ui5.walkthrough.view.HelloDialog",id:"dialog2"})}this.dialogPromise.then(e=>e.open())},onCloseDialog(){this.byId("helloDialog")?.close();this.byId("dialog2--helloDialog")?.close()}})});
//# sourceMappingURL=HelloPanel.controller.js.map