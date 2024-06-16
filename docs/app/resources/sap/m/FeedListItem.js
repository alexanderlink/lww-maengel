/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBase","./Link","./library","./FormattedText","sap/ui/core/IconPool","sap/m/Button","sap/ui/Device","./FeedListItemRenderer","sap/m/Avatar","sap/m/AvatarShape","sap/m/AvatarSize","sap/ui/core/Theming","sap/ui/util/openWindow","sap/ui/core/Lib","sap/ui/core/InvisibleText","sap/ui/core/Element"],function(t,e,i,s,o,a,n,r,l,p,h,g,u,d,c,f){"use strict";var _=i.ListType;var x=i.LinkConversion;var v=i.ButtonType;var y=t.extend("sap.m.FeedListItem",{metadata:{library:"sap.m",designtime:"sap/m/designtime/FeedListItem.designtime",properties:{icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},iconDisplayShape:{type:"sap.m.AvatarShape",defaultValue:p.Circle},iconInitials:{type:"string",defaultValue:""},iconSize:{type:"sap.m.AvatarSize",defaultValue:h.S},activeIcon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},sender:{type:"string",group:"Data",defaultValue:null},text:{type:"string",group:"Data",defaultValue:null},moreLabel:{type:"string",group:"Data",defaultValue:null},lessLabel:{type:"string",group:"Data",defaultValue:null},info:{type:"string",group:"Data",defaultValue:null},timestamp:{type:"string",group:"Data",defaultValue:null},senderActive:{type:"boolean",group:"Behavior",defaultValue:true},iconActive:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",defaultValue:true},showIcon:{type:"boolean",group:"Behavior",defaultValue:true},convertLinksToAnchorTags:{type:"sap.m.LinkConversion",group:"Behavior",defaultValue:x.None},convertedLinksDefaultTarget:{type:"string",group:"Behavior",defaultValue:"_blank"},maxCharacters:{type:"int",group:"Behavior",defaultValue:null}},defaultAggregation:"actions",aggregations:{actions:{type:"sap.m.FeedListItemAction",multiple:true},_text:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_actionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"},_actionButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_avatar:{type:"sap.m.Avatar",multiple:false,visibility:"hidden"}},events:{senderPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}},iconPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}}}},renderer:r});y._oRb=d.getResourceBundleFor("sap.m");y._nMaxCharactersMobile=300;y._nMaxCharactersDesktop=500;y._sTextShowMore=y._oRb.getText("TEXT_SHOW_MORE");y._sTextShowLess=y._oRb.getText("TEXT_SHOW_LESS");y._sTextListItem=y._oRb.getText("LIST_ITEM");y.prototype.init=function(){t.prototype.init.apply(this);this.setAggregation("_text",new s(this.getId()+"-formattedText"),true);this.setAggregation("_actionButton",new a({id:this.getId()+"-actionButton",type:v.Transparent,icon:"sap-icon://overflow",press:[this._onActionButtonPress,this]}),true);this._oInvisibleText=new c;this._oInvisibleText.toStatic();this._oInvisibleText.setText(y._sTextListItem)};y.prototype._onActionButtonPress=function(){sap.ui.require(["sap/m/ActionSheet"],this._openActionSheet.bind(this))};y.prototype._openActionSheet=function(t){var e=this.getAggregation("_actionSheet");var i=this.getActions();var s;if(!(e&&e instanceof t)){e=new t({id:this.getId()+"-actionSheet",beforeOpen:[this._onBeforeOpenActionSheet,this]});this.setAggregation("_actionSheet",e,true)}e.destroyAggregation("buttons",true);for(var o=0;o<i.length;o++){s=i[o];e.addButton(new a({icon:s.getIcon(),text:s.getText(),visible:s.getVisible(),enabled:s.getEnabled(),press:s.firePress.bind(s,{item:this})}))}e.openBy(this.getAggregation("_actionButton"))};y.prototype._onBeforeOpenActionSheet=function(t){var e,i;if(n.system.phone){return}i=g.getTheme();e=t.getSource().getParent();e.removeStyleClass("sapContrast sapContrastPlus");if(i==="sap_belize"){e.addStyleClass("sapContrast")}else if(i==="sap_belize_plus"){e.addStyleClass("sapContrastPlus")}};y.prototype.invalidate=function(){t.prototype.invalidate.apply(this,arguments);var e=y._sTextShowMore;if(this.getMoreLabel()){e=this.getMoreLabel()}delete this._bTextExpanded;if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.setProperty("text",e,true)}};y.prototype.onBeforeRendering=function(){this.$("realtext").find('a[target="_blank"]').off("click");var t=this.getAggregation("_text");t.setProperty("convertLinksToAnchorTags",this.getConvertLinksToAnchorTags(),true);t.setProperty("convertedLinksDefaultTarget",this.getConvertedLinksDefaultTarget(),true);if(this.getConvertLinksToAnchorTags()===x.None){t.setHtmlText(this.getText())}else{t.setProperty("htmlText",this.getText(),true)}this._sFullText=t._getDisplayHtml().replace(/\n/g,"<br>");this._sShortText=this._getCollapsedText();if(this._sShortText){this._sShortText=this._sShortText.replace(/<br>/g," ")}this._bEmptyTagsInShortTextCleared=false};y.prototype.onAfterRendering=function(){var t=this.getAggregation("_text"),e=this.getDomRef();if(document.getElementById(this.getAggregation("_actionButton"))){document.getElementById(this.getAggregation("_actionButton").getId()).setAttribute("aria-haspopup","menu")}if(this._checkTextIsExpandable()&&!this._bTextExpanded){this._clearEmptyTagsInCollapsedText()}this.$("realtext").find('a[target="_blank"]').on("click",T);e&&t&&t._sanitizeCSSPosition(e.querySelector(".sapMFeedListItemText"))};y.prototype.exit=function(){this.$("realtext").find('a[target="_blank"]').off("click",T);if(this._oLinkControl){this._oLinkControl.destroy()}if(this._oInvisibleText){this._oInvisibleText.destroy()}if(this.oAvatar){this.oAvatar.destroy()}if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.destroy()}t.prototype.exit.apply(this)};function T(t){if(t.originalEvent.defaultPrevented){return}t.preventDefault();u(t.currentTarget.href,t.currentTarget.target)}y.prototype.ontap=function(e){if(e.srcControl){if(!this.getIconActive()&&this.oAvatar&&e.srcControl.getId()===this.oAvatar.getId()||!this.getSenderActive()&&this._oLinkControl&&e.srcControl.getId()===this._oLinkControl.getId()||(!this.oAvatar||e.srcControl.getId()!==this.oAvatar.getId()&&(!this._oLinkControl||e.srcControl.getId()!==this._oLinkControl.getId())&&(!this._oLinkExpandCollapse||e.srcControl.getId()!==this._oLinkExpandCollapse.getId()))){t.prototype.ontap.apply(this,[e])}}};y.prototype.onfocusin=function(t){var e=t.srcControl,i=e.getDomRef(),s=this.getParent().getAccessbilityPosition(e);if(e instanceof y){i.setAttribute("aria-posinset",s.posInset);i.setAttribute("aria-setsize",s.setSize);this.addAriaLabelledBy(this._oInvisibleText.getId())}};y.prototype.onfocusout=function(t){this.removeAriaLabelledBy(this._oInvisibleText.getId())};y.prototype._getAvatar=function(){var t=this.getIcon();var e=this.getId()+"-icon";this.oAvatar=this.getAggregation("_avatar");this.oAvatar=this.oAvatar||new l(e);this.oAvatar.applySettings({src:t,displayShape:this.getIconDisplayShape(),initials:this.getIconInitials(),displaySize:this.getIconSize(),ariaLabelledBy:this.getSender()});var i=this;if(this.getIconActive()){this.oAvatar.addStyleClass("sapMFeedListItemImage");if(!this.oAvatar.hasListeners("press")){this.oAvatar.attachPress(function(){i.fireIconPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)})})}}else{this.oAvatar.addStyleClass("sapMFeedListItemImageInactive")}this.setAggregation("_avatar",this.oAvatar);return this.oAvatar};y.prototype._getLinkSender=function(t){if(!this._oLinkControl){var i=this;this._oLinkControl=new e({press:function(){i.fireSenderPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)})}});this._oLinkControl.setParent(this,null,true)}if(t){this._oLinkControl.setText(this.getSender()+y._oRb.getText("COLON"))}else{this._oLinkControl.setText(this.getSender())}this._oLinkControl.setEnabled(this.getSenderActive());return this._oLinkControl};y.prototype._activeHandlingInheritor=function(){var t=this.getActiveIcon();if(this.oAvatar&&t){this.oAvatar.setSrc(t)}};y.prototype._inactiveHandlingInheritor=function(){var t=this.getIcon()?this.getIcon():o.getIconURI("person-placeholder");if(this.oAvatar){this.oAvatar.setSrc(t)}};y.prototype._getCollapsedText=function(){this._nMaxCollapsedLength=this.getMaxCharacters();if(this._nMaxCollapsedLength===0){if(n.system.phone){this._nMaxCollapsedLength=y._nMaxCharactersMobile}else{this._nMaxCollapsedLength=y._nMaxCharactersDesktop}}var t=this._convertHtmlToPlainText(this._sFullText);var e=null;if(t&&t.length>this._nMaxCollapsedLength){var i=t.substring(0,this._nMaxCollapsedLength);var s=i.lastIndexOf(" ");if(s>0){i=i.substr(0,s)}if(t.length===this._sFullText.length){e=i}else{e=this._convertPlainToHtmlText(i)}}return e};y.prototype._clearEmptyTagsInCollapsedText=function(){var t;if(this._bEmptyTagsInShortTextCleared){return}this._bEmptyTagsInShortTextCleared=true;do{t=this.$("realtext").find(":empty").remove()}while(t.length>0);this._sShortText=this.$("realtext").html()};y.prototype._toggleTextExpanded=function(){var t=this.$("realtext");var e=this.$("threeDots");var i=y._sTextShowMore;var s=y._sTextShowLess;var o=this.getAggregation("_text");if(this.getMoreLabel()){i=this.getMoreLabel()}if(this.getLessLabel()){s=this.getLessLabel()}t.find('a[target="_blank"]').off("click");if(this._bTextExpanded){t.html(this._sShortText.replace(/&#xa;/g,"<br>"));o._sanitizeCSSPosition(t[0]);e.text(" ... ");this._oLinkExpandCollapse.setText(i);this._bTextExpanded=false;this._clearEmptyTagsInCollapsedText()}else{t.html(this._sFullText.replace(/&#xa;/g,"<br>"));o._sanitizeCSSPosition(t[0]);e.text("  ");this._oLinkExpandCollapse.setText(s);this._bTextExpanded=true}t.find('a[target="_blank"]').on("click",T)};y.prototype._getLinkExpandCollapse=function(){var t=y._sTextShowMore;if(this.getMoreLabel()){t=this.getMoreLabel()}if(!this._oLinkExpandCollapse){this._oLinkExpandCollapse=new e({text:t,press:[this._toggleTextExpanded,this]});this._bTextExpanded=false;this._oLinkExpandCollapse.setParent(this,null,true)}return this._oLinkExpandCollapse};y.prototype._convertHtmlToPlainText=function(t){var e=/(<([^>]+)>)/gi;return t.replace(e,"")};y.prototype._convertPlainToHtmlText=function(t){var e=this._sFullText;var i=/(<([^>]+)>)/gi;var s=e.split(i);var o="";for(var a=0;a<s.length;a++){if(s[a].length===0){continue}if(t.length>0&&s[a].indexOf(t.trim())!==-1){s[a]=t}if(/^<.+>$/.test(s[a])){o=o+s[a];s[a+1]="";continue}if(t.indexOf(s[a].trim())===-1){continue}else{t=t.replace(s[a],"")}o=o+s[a]}return o};y.prototype._checkTextIsExpandable=function(){return this._sShortText!==null};y.prototype.setType=function(t){if(this.getType()!==t){if(t===_.Navigation){this.setProperty("type",_.Active)}else{this.setProperty("type",t)}}return this};return y});
//# sourceMappingURL=FeedListItem.js.map