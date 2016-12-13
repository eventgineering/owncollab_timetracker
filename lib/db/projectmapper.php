<?php
namespace OCA\OwnCollab_TimeTracker\Db;

use OCP\IDb;
use OCP\AppFramework\Db\Mapper;

class ProjectMapper extends Mapper {

    public function __construct(IDb $db) {
        parent::__construct($db, 'owncollab_timetracker_projects', '\OCA\OwnCollab_TimeTracker\Db\Project');
    }

    public function findAll() {
        $sql = 'SELECT * FROM *PREFIX*owncollab_timetracker_projects';
        return $this->findEntities($sql);
    }
    
    public function find($id) {
        $sql = 'SELECT * FROM *PREFIX*owncollab_timetracker_projects WHERE id = ?';
        return $this->findEntity($sql, [$id]);
    }

}
