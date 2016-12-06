<?php
 namespace OCA\OwnCollab_TimeTracker\Controller;

 use OCP\IRequest;
 use OCP\AppFramework\Http\TemplateResponse;
 use OCP\AppFramework\Http\DataResponse;
 use OCP\AppFramework\Controller;

 class PageController extends Controller {

     private $userId;

     public function __construct($AppName, IRequest $request, $userId){
         parent::__construct($AppName, $request);
         $this->userId = $UserId;
     }

     /**
      * @NoAdminRequired
      * @NoCSRFRequired
      */
     public function index() {
         return new TemplateResponse('owncollab_timetracker', 'main');
     }

        /**
         * Simply method that posts back the payload of the request
         * @NoAdminRequired
         */
        public function doEcho($echo) {
                return new DataResponse(['echo' => $echo]);
        }

 }