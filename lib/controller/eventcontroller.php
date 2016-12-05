<?php
 namespace OCA\OwnCollab_TimeTracker\Controller;

 use OCP\IRequest;
 use OCP\AppFramework\Controller;

 class NoteController extends Controller {

     public function __construct($AppName, IRequest $request){
         parent::__construct($AppName, $request);
     }

     /**
      * @NoAdminRequired
      */
     public function index() {
         // empty for now
     }

     /**
      * @NoAdminRequired
      *
      * @param int $id
      */
     public function show($id) {
         // empty for now
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
         // empty for now
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
         // empty for now
     }

     /**
      * @NoAdminRequired
      *
      * @param int $id
      */
     public function destroy($id) {
         // empty for now
     }

 }