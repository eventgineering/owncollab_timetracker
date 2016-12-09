<?php
namespace OCA\OwnCollab_TimeTracker\Db;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

class Client extends Entity implements JsonSerializable {

    protected $name;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}