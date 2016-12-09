<?php
namespace OCA\OwnCollab_TimeTracker\Db;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

class Event extends Entity implements JsonSerializable {

    protected $title;
    protected $content;
    protected $startdate;
    protected $starttime;
    protected $enddate;
    protected $endtime;
    protected $userId;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'startdate' => $this->startdate,
            'starttime' => $this->starttime,
            'enddate' => $this->enddate,
            'endtime' => $this->endtime,
        ];
    }
}
