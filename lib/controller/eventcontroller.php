<?php
 namespace OCA\OwnCollab_TimeTracker\Controller;

 use Exception;

 use OCP\IRequest;
 use OCP\AppFramework\Http;
 use OCP\AppFramework\Http\DataResponse; 
 use OCP\AppFramework\Controller;

 use OCA\OwnNotes\Db\Event;
 use OCA\OwnNotes\Db\EventMapper;

 class EventController extends Controller {

     private $mapper;
     private $userId;

     public function __construct($AppName, IRequest $request, NoteMapper $mapper, $UserId){
         parent::__construct($AppName, $request);
         $this->mapper = $mapper;
         $this->userId = $UserId;
     }

     /**
      * @NoAdminRequired
      */
     public function index() {
         return new DataResponse($this->mapper->findAll($this->userId));
     }

     /**
      * @NoAdminRequired
      *
      * @param int $id
      */
     public function show($id) {
         try {
             return new DataResponse($this->mapper->find($id, $this->userId));
         } catch(Exception $e) {
             return new DataResponse([], Http::STATUS_NOT_FOUND);
         }
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
         $event = new Event();
         $event->setStart($start);
         $event->setEnd($end);
         $event->setNotes($notes);
         $event->setClient($client);
         $event->setProject($project);
         $event->setUserId($this->userId);
         return new DataResponse($this->mapper->insert($event));
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
         try {
             $event = $this->mapper->find($id, $this->userId);
         } catch(Exception $e) {
             return new DataResponse([], Http::STATUS_NOT_FOUND);
         }
         $event->setStart($start);
         $event->setEnd($end);
         $event->setNotes($notes);
         $event->setClient($client);
         $event->setProject($project);
         $event->setUserId($this->userId);
         return new DataResponse($this->mapper->update($event));
     }

     /**
      * @NoAdminRequired
      *
      * @param int $id
      */
     public function destroy($id) {
         try {
             $event = $this->mapper->find($id, $this->userId);
         } catch(Exception $e) {
             return new DataResponse([], Http::STATUS_NOT_FOUND);
         }
         $this->mapper->delete($event);
         return new DataResponse($event);
     }

 }