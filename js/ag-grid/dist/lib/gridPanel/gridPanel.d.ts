// Type definitions for ag-grid v7.1.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
import { BorderLayout } from "../layout/borderLayout";
import { LoggerFactory } from "../logger";
import { BeanStub } from "../context/beanStub";
export declare class GridPanel extends BeanStub {
    private masterSlaveService;
    private gridOptionsWrapper;
    private columnController;
    private rowRenderer;
    private floatingRowModel;
    private eventService;
    private rowModel;
    private rangeController;
    private dragService;
    private selectionController;
    private clipboardService;
    private csvCreator;
    private mouseEventService;
    private focusedCellController;
    private $scope;
    private scrollVisibleService;
    private contextMenuFactory;
    private frameworkFactory;
    private layout;
    private logger;
    private requestAnimationFrameExists;
    private scrollLagCounter;
    private scrollLagTicking;
    private eBodyViewport;
    private eRoot;
    private eBody;
    private eBodyContainer;
    private ePinnedLeftColsContainer;
    private ePinnedRightColsContainer;
    private eFullWidthCellViewport;
    private eFullWidthCellContainer;
    private eHeaderContainer;
    private eHeaderOverlay;
    private ePinnedLeftHeader;
    private ePinnedRightHeader;
    private eHeader;
    private eBodyViewportWrapper;
    private ePinnedLeftColsViewport;
    private ePinnedRightColsViewport;
    private eHeaderViewport;
    private eFloatingTop;
    private ePinnedLeftFloatingTop;
    private ePinnedRightFloatingTop;
    private eFloatingTopContainer;
    private eFloatingTopViewport;
    private eFloatingTopFullWidthCellContainer;
    private eFloatingBottom;
    private ePinnedLeftFloatingBottom;
    private ePinnedRightFloatingBottom;
    private eFloatingBottomContainer;
    private eFloatingBottomViewport;
    private eFloatingBottomFullWidthCellContainer;
    private eAllCellContainers;
    private lastLeftPosition;
    private lastTopPosition;
    private animationThreadCount;
    private useScrollLag;
    private enableRtl;
    private forPrint;
    private scrollWidth;
    agWire(loggerFactory: LoggerFactory): void;
    getVerticalPixelRange(): any;
    destroy(): void;
    private onRowDataChanged();
    private showOrHideOverlay();
    getLayout(): BorderLayout;
    private init();
    private addAngularApplyCheck();
    private disableBrowserDragging();
    private addEventListeners();
    private addDragListeners();
    private addMouseEvents();
    private addKeyboardEvents();
    private addBodyViewportListener();
    private getRowForEvent(event);
    private processKeyboardEvent(eventName, keyboardEvent);
    private processMouseEvent(eventName, mouseEvent);
    private onContextMenu(mouseEvent);
    private preventDefaultOnContextMenu(mouseEvent);
    private addShortcutKeyListeners();
    private onCtrlAndA(event);
    private onCtrlAndC(event);
    private onCtrlAndV(event);
    private onCtrlAndD(event);
    getPinnedLeftFloatingTop(): HTMLElement;
    getPinnedRightFloatingTop(): HTMLElement;
    getFloatingTopContainer(): HTMLElement;
    getPinnedLeftFloatingBottom(): HTMLElement;
    getPinnedRightFloatingBottom(): HTMLElement;
    getFloatingBottomContainer(): HTMLElement;
    private createOverlayTemplate(name, defaultTemplate, userProvidedTemplate);
    private createLoadingOverlayTemplate();
    private createNoRowsOverlayTemplate();
    ensureIndexVisible(index: any): void;
    private getPrimaryScrollViewport();
    getCenterWidth(): number;
    private isHorizontalScrollShowing();
    private isVerticalScrollShowing();
    private isBodyVerticalScrollShowing();
    periodicallyCheck(): void;
    private setScrollShowing();
    private setBottomPaddingOnPinnedRight();
    private setMarginOnFullWidthCellContainer();
    ensureColumnVisible(key: any): void;
    showLoadingOverlay(): void;
    showNoRowsOverlay(): void;
    hideOverlay(): void;
    private getWidthForSizeColsToFit();
    sizeColumnsToFit(nextTimeout?: number): void;
    getBodyContainer(): HTMLElement;
    getFullWidthCellContainer(): HTMLElement;
    getFloatingTopFullWidthCellContainer(): HTMLElement;
    getFloatingBottomFullWidthCellContainer(): HTMLElement;
    getDropTargetBodyContainers(): HTMLElement[];
    getBodyViewport(): HTMLElement;
    getPinnedLeftColsContainer(): HTMLElement;
    getDropTargetLeftContainers(): HTMLElement[];
    getPinnedRightColsContainer(): HTMLElement;
    getDropTargetPinnedRightContainers(): HTMLElement[];
    getHeaderContainer(): HTMLElement;
    getHeaderOverlay(): HTMLElement;
    getRoot(): HTMLElement;
    getPinnedLeftHeader(): HTMLElement;
    getPinnedRightHeader(): HTMLElement;
    private queryHtmlElement(selector);
    private findElements();
    private addMouseWheelEventListeners();
    getHeaderViewport(): HTMLElement;
    private centerMouseWheelListener(event);
    genericMouseWheelListener(event: any): boolean;
    private generalMouseWheelListener(event, targetPanel);
    onDisplayedColumnsChanged(): void;
    private onDisplayedColumnsWidthChanged();
    private onScrollVisibilityChanged();
    private setWidthsOfContainers();
    private setPinnedLeftWidth();
    private setPinnedRightWidth();
    private pinningRight;
    private pinningLeft;
    private setPinnedContainersVisible();
    setBodyAndHeaderHeights(): void;
    setHorizontalScrollPosition(hScrollPosition: number): void;
    scrollHorizontally(pixels: number): number;
    turnOnAnimationForABit(): void;
    private addScrollListener();
    private onBodyScroll();
    private onBodyHorizontalScroll();
    private onBodyVerticalScroll();
    private onVerticalScroll(sourceElement);
    private isBodyVerticalScrollActive();
    private addIEPinFix(onPinnedRightScroll, onPinnedLeftScroll);
    private setLeftAndRightBounds();
    private isUseScrollLag();
    private debounce(callback);
    getBodyViewportScrollLeft(): number;
    setBodyViewportScrollLeft(value: number): void;
    horizontallyScrollHeaderCenterAndFloatingCenter(): void;
    private fakeVerticalScroll(position);
    addScrollEventListener(listener: () => void): void;
    removeScrollEventListener(listener: () => void): void;
}
