<?php
namespace OCA\OwnCollab_TimeTracker\Db;

use OCP\IDb;
use OCP\AppFramework\Db\Mapper;

class JobMapper extends Mapper {

    public function __construct(IDb $db) {
        parent::__construct($db, 'owncollab_timetracker_jobs', '\OCA\OwnCollab_TimeTracker\Db\Job');
    }

    public function findAll() {
        $sql = 'SELECT * FROM *PREFIX*owncollab_timetracker_jobs';
        return $this->findEntities($sql);
    }
    
    public function find($id) {
        $sql = 'SELECT * FROM *PREFIX*owncollab_timetracker_jobs WHERE id = ?';
        return $this->findEntity($sql, [$id]);
    }

}
