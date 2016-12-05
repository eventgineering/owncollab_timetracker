<?php
 namespace OCA\OwnCollab_TimeTracker\Controller;

 use OCP\IRequest;
 use OCP\AppFramework\Http\TemplateResponse;
 use OCP\AppFramework\Controller;

 class PageController extends Controller {

     public function __construct($AppName, IRequest $request){
         parent::__construct($AppName, $request);
     }

     /**
      * @NoAdminRequired
      * @NoCSRFRequired
      */
     public function index() {
         return new TemplateResponse('owncollab_timetracker', 'main');
     }

 }