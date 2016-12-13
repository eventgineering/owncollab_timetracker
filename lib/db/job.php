<?php
namespace OCA\OwnCollab_TimeTracker\Db;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

class Job extends Entity implements JsonSerializable {

    protected $name;
    protected $rate;
    protected $currency;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'rate' => $this->rate,
            'currency' => $this->currency,
        ];
    }
}