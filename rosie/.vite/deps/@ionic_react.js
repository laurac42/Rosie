import {
  CreateAnimation,
  DefaultIonLifeCycleContext,
  IonAccordion,
  IonAccordionGroup,
  IonActionSheet,
  IonAlert,
  IonApp,
  IonAvatar,
  IonBackButton,
  IonBackdrop,
  IonBadge,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonLifeCycleContext,
  IonList,
  IonListHeader,
  IonLoading,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonModal,
  IonNav,
  IonNavLink,
  IonNote,
  IonPage,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
  IonPickerLegacy,
  IonPopover,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonRedirect,
  IonRefresher,
  IonRefresherContent,
  IonReorder,
  IonReorderGroup,
  IonRippleEffect,
  IonRoute,
  IonRouterContext,
  IonRouterLink,
  IonRouterOutlet,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonSelect,
  IonSelectModal,
  IonSelectOption,
  IonSkeletonText,
  IonSpinner,
  IonSplitPane,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTabsContext,
  IonText,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToast,
  IonToggle,
  IonToolbar,
  IonicSafeString,
  IonicSlides,
  LocationHistory,
  NavContext,
  NavManager,
  RouteManagerContext,
  StackContext,
  ViewLifeCycleManager,
  ViewStacks,
  generateId,
  getConfig,
  getPlatforms,
  getTimeGivenProgression,
  isPlatform,
  openURL,
  setupIonicReact,
  useIonActionSheet,
  useIonAlert,
  useIonLoading,
  useIonModal,
  useIonPicker,
  useIonPopover,
  useIonRouter,
  useIonToast,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
  withIonLifeCycle
} from "./chunk-SKBRX33X.js";
import "./chunk-OAHRFN6U.js";
import {
  iosTransitionAnimation
} from "./chunk-WF3RPARZ.js";
import {
  mdTransitionAnimation
} from "./chunk-BZYDZO44.js";
import {
  createAnimation,
  getIonPageElement
} from "./chunk-75TZPRAJ.js";
import "./chunk-UBMGMN77.js";
import "./chunk-YPOGSDG5.js";
import "./chunk-7UVAXU7Q.js";
import "./chunk-X2UHEJVQ.js";
import "./chunk-F7JUQZHQ.js";
import "./chunk-2A5WUACF.js";
import {
  createGesture
} from "./chunk-7X7UJEGS.js";
import "./chunk-7YD6DIQX.js";
import "./chunk-LYDS5F64.js";
import "./chunk-43EAWSPA.js";
import "./chunk-PNM76LIE.js";
import "./chunk-IJPFNWLR.js";
import "./chunk-2AUN3ADB.js";
import "./chunk-A6UBFJWH.js";
export {
  CreateAnimation,
  DefaultIonLifeCycleContext,
  IonAccordion,
  IonAccordionGroup,
  IonActionSheet,
  IonAlert,
  IonApp,
  IonAvatar,
  IonBackButton,
  IonBackdrop,
  IonBadge,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonLifeCycleContext,
  IonList,
  IonListHeader,
  IonLoading,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonModal,
  IonNav,
  IonNavLink,
  IonNote,
  IonPage,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
  IonPickerLegacy,
  IonPopover,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonRedirect,
  IonRefresher,
  IonRefresherContent,
  IonReorder,
  IonReorderGroup,
  IonRippleEffect,
  IonRoute,
  IonRouterContext,
  IonRouterLink,
  IonRouterOutlet,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonSelect,
  IonSelectModal,
  IonSelectOption,
  IonSkeletonText,
  IonSpinner,
  IonSplitPane,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTabsContext,
  IonText,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToast,
  IonToggle,
  IonToolbar,
  IonicSafeString,
  IonicSlides,
  LocationHistory,
  NavContext,
  NavManager,
  RouteManagerContext,
  StackContext,
  ViewLifeCycleManager,
  ViewStacks,
  createAnimation,
  createGesture,
  generateId,
  getConfig,
  getIonPageElement,
  getPlatforms,
  getTimeGivenProgression,
  iosTransitionAnimation,
  isPlatform,
  mdTransitionAnimation,
  openURL,
  setupIonicReact,
  useIonActionSheet,
  useIonAlert,
  useIonLoading,
  useIonModal,
  useIonPicker,
  useIonPopover,
  useIonRouter,
  useIonToast,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
  withIonLifeCycle
};
//# sourceMappingURL=@ionic_react.js.map
