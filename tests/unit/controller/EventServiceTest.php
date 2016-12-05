<?php
namespace OCA\OwnCollab_TimeTracker\Tests\Unit\Service;

use PHPUnit_Framework_TestCase;

use OCP\AppFramework\Db\DoesNotExistException;

use OCA\OwnCollab_TimeTracker\Db\Event;

class EventServiceTest extends PHPUnit_Framework_TestCase {

    private $service;
    private $mapper;
    private $userId = 'john';

    public function setUp() {
        $this->mapper = $this->getMockBuilder('OCA\OwnCollab_TimeTracker\Db\EventMapper')
            ->disableOriginalConstructor()
            ->getMock();
        $this->service = new EventService($this->mapper);
    }

    public function testUpdate() {
        // the existing event
        $note = Note::fromRow([
            'id' => 3,
            'start' => '01.01.2016 00:00:00',
            'end' => '01.01.2016 00:00:01',
            'notes' => 'This is a note',
            'client' => 'This is a clients name',
            'project' => 'This ia a project name'
        ]);
        $this->mapper->expects($this->once())
            ->method('find')
            ->with($this->equalTo(3))
            ->will($this->returnValue($event));

        // the event when updated
        $updatedEvent = Event::fromRow(['id' => 3]);
        $updatedEvent->setStart('start');
        $updatedEvent->setEnd('end');
        $updatedEvent->setNotes('notes');
        $updatedEvent->setClient('client');
        $updatedNote->setProject('project');
        $this->mapper->expects($this->once())
            ->method('update')
            ->with($this->equalTo($updatedEvent))
            ->will($this->returnValue($updatedEvent));

        $result = $this->service->update(3, 'start', 'end', 'notes', 'client', 'projectt', $this->userId);

        $this->assertEquals($updatedEvent, $result);
    }


    /**
     * @expectedException OCA\OwnCollab_TimeTracker\Service\NotFoundException
     */
    public function testUpdateNotFound() {
        // test the correct status code if no note is found
        $this->mapper->expects($this->once())
            ->method('find')
            ->with($this->equalTo(3))
            ->will($this->throwException(new DoesNotExistException('')));

        $this->service->update(3, 'start', 'end', 'notes', 'client', 'project', $this->userId);
    }

}