<?php
namespace OCA\OwnCollab_TimeTracker\Db;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

class Event extends Entity implements JsonSerializable {

    protected $start;
    protected $end;
    protected $notes;
    protected $client;
    protected $project;
    protected $userId;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'start' => $this->start,
            'end' => $this->end,
            'notes' => $this->notes,
            'client' => $this->client,
            'project' => $this->project
        ];
    }
}