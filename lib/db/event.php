<?php
namespace OCA\OwnCollab_TimeTracker\Db;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

class Event extends Entity implements JsonSerializable {

    protected $title;
    protected $content;
    protected $start;
    protected $end;
    protected $userId;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'start' => $this->start,
            'end' => $this->end
        ];
    }
}
