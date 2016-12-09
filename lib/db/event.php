<?php
namespace OCA\OwnCollab_TimeTracker\Db;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

class Event extends Entity implements JsonSerializable {

    protected $title;
    protected $content;
    protected $startdate;
    protected $enddate;
    protected $userId;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'startdate' => $this->startdate,
            'enddate' => $this->enddate
        ];
    }
}
