<?php
namespace OCA\OwnCollab_TimeTracker\Db;

use OCP\IDb;
use OCP\AppFramework\Db\Mapper;

class ClientMapper extends Mapper {

    public function __construct(IDb $db) {
        parent::__construct($db, 'owncollab_timetracker_clients', '\OCA\OwnCollab_TimeTracker\Db\Client');
    }

    public function findAll() {
        $sql = 'SELECT * FROM *PREFIX*owncollab_timetracker_clients';
        return $this->findEntities($sql);
    }
    
    public function find($id) {
        $sql = 'SELECT * FROM *PREFIX*owncollab_timetracker_clients WHERE id = ?';
        return $this->findEntity($sql, [$id]);
    }

}
