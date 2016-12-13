<?php
namespace OCA\OwnCollab_TimeTracker\Db;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

class Project extends Entity implements JsonSerializable {

    protected $name;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'clientid' => $this->clientid,
            'name' => $this->name,
        ];
    }
}