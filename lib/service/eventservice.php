<?php
namespace OCA\OwnCollab_TimeTracker\Service;

use Exception;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

use OCA\OwnCollab_TimeTracker\Db\Event;
use OCA\OwnCollab_TimeTracker\Db\EventMapper;


class EventService {

    private $mapper;

    public function __construct(EventMapper $mapper){
        $this->mapper = $mapper;
    }

    public function findAll($userId) {
        return $this->mapper->findAll($userId);
    }

    private function handleException ($e) {
        if ($e instanceof DoesNotExistException ||
            $e instanceof MultipleObjectsReturnedException) {
            throw new NotFoundException($e->getMessage());
        } else {
            throw $e;
        }
    }

    public function find($id, $userId) {
        try {
            return $this->mapper->find($id, $userId);

        // in order to be able to plug in different storage backends like files
        // for instance it is a good idea to turn storage related exceptions
        // into service related exceptions so controllers and service users
        // have to deal with only one type of exception
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }
     public function create($start, $end, $notes, $client, $project, $userId) {
         $event = new Event();
         $event->setStart($start);
         $event->setEnd($end);
         $event->setNotes($notes);
         $event->setClient($client);
         $event->setProject($project);
         $event->setUserId($this->userId);
         return $this->mapper->insert($event);
     }

     public function update($id, $user, $start, $end, $notes, $client, $project, $userId) {
         try {
             $event = $this->mapper->find($id, $userId);
             $event->setStart($start);
             $event->setEnd($end);
             $event->setNotes($notes);
             $event->setClient($client);
             $event->setProject($project);
             return $this->mapper->update($event);
         }  catch(Exception $e) {
            $this->handleException($e);
        }
     }

    public function delete($id, $userId) {
        try {
            $event = $this->mapper->find($id, $userId);
            $this->mapper->delete($event);
            return $event;
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }

}