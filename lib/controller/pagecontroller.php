<?php
 namespace OCA\OwnCollab_TimeTracker\Controller;

 use OCP\IRequest;
 use OCP\AppFramework\Http\TemplateResponse;
 use OCP\AppFramework\Controller;

 class PageController extends Controller {
	private $userId;
     public function __construct($AppName, IRequest $request, $UserId){
         parent::__construct($AppName, $request);
         $this->userId = $UserId;
     }

     /**
      * @NoAdminRequired
      * @NoCSRFRequired
      */
     public function index() {
		 $params = ['user' => $this->userId];
         return new TemplateResponse('owncollab_timetracker', 'main');
     }

 }