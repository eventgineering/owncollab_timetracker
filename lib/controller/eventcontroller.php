<?php
 namespace OCA\OwnCollab_TimeTracker\Controller;

 use OCP\IRequest;
 use OCP\AppFramework\Http\DataResponse; 
 use OCP\AppFramework\Controller;

 use OCA\OwnCollab_TimeTracker\Lib\Service\EventService;

 class EventController extends Controller {

     private $service;
     private $userId;

     use Errors;

     public function __construct($AppName, IRequest $request, EventService $service, $UserId){
         parent::__construct($AppName, $request);
         $this->service = $service;
         $this->userId = $UserId;
     }

     /**
      * @NoAdminRequired
      */
     public function index() {
        return new DataResponse($this->service->findAll($this->userId));
     }

     /**
      * @NoAdminRequired
      *
      * @param int $id
      */
     public function show($id) {

        return $this->handleNotFound(function () use ($id) {
            return $this->service->find($id, $this->userId);
        });
     }

     /**
      * @NoAdminRequired
      *
      * @param string $start
      * @param string $end
      * @param string $notes
      * @param string $client
      * @param string $project
      */
     public function create($start, $end, $notes, $client, $project) {
        return $this->service->create($start, $end, $notes, $client, $project, $this->userId);
     }

     /**
      * @NoAdminRequired
      *
      * @param int $id
      * @param string $user
      * @param string $start
      * @param string $end
      * @param string $notes
      * @param string $client
      * @param string $project
      */
     public function update($id, $user, $start, $end, $notes, $client, $project) {

        return $this->handleNotFound(function () use ($id, $start, $end, $notes, $client, $project) {
            return $this->service->update($id, $start, $end, $notes, $client, $project, $this->userId);
        });
     }

     /**
      * @NoAdminRequired
      *
      * @param int $id
      */
     public function destroy($id) {
        return $this->handleNotFound(function () use ($id) {
            return $this->service->delete($id, $this->userId);
        });
     }

 }