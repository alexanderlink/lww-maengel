sap.ui.define([], () => {
	"use strict";

	return {
		statusText(sStatus) {
			const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			switch (sStatus) {
				case "A":
					return oResourceBundle.getText("defectStatusA");
				case "B":
					return oResourceBundle.getText("defectStatusB");
				case "C":
					return oResourceBundle.getText("defectStatusC");
				default:
					return sStatus;
			}
		}
	};
});
