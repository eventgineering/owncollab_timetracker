<?php
namespace OCA\OwCollab_TimeTracker\Db;

use OCP\IDb;
use OCP\AppFramework\Db\Mapper;

class EventMapper extends Mapper {

    public function __construct(IDb $db) {
        parent::__construct($db, 'owncollab_timetracker_events', '\OCA\OwnCollab_TimeTracker\Db\Event');
    }

    public function find($id, $userId) {
        $sql = 'SELECT * FROM *PREFIX*owncollab_timetracker_events WHERE id = ? AND user_id = ?';
        return $this->findEntity($sql, [$id, $userId]);
    }

    public function findAll($userId) {
        $sql = 'SELECT * FROM *PREFIX*owncollab_timetracker_events WHERE user_id = ?';
        return $this->findEntities($sql, [$userId]);
    }

}