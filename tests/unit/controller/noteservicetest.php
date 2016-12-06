<?php
namespace OCA\OwnCollab_TimeTracker\Tests\Unit\Service;

use PHPUnit_Framework_TestCase;

use OCP\AppFramework\Db\DoesNotExistException;

use OCA\OwnCollab_TimeTracker\Db\Note;

class NoteServiceTest extends PHPUnit_Framework_TestCase {

    private $service;
    private $mapper;
    private $userId = 'john';

    public function setUp() {
        $this->mapper = $this->getMockBuilder('OCA\OwnCollab_TimeTracker\Db\NoteMapper')
            ->disableOriginalConstructor()
            ->getMock();
        $this->service = new NoteService($this->mapper);
    }

    public function testUpdate() {
        // the existing event
        $event = Note::fromRow([
            'id' => 3,
            'title' => 'yo',
            'content' => 'nope'
        ]);
        $this->mapper->expects($this->once())
            ->method('find')
            ->with($this->equalTo(3))
            ->will($this->returnValue($event));

        // the event when updated
        $updatedNote = Note::fromRow(['id' => 3]);
        $updatedNote->setTitle('title');
        $updatedNote->setContent('content');
        $this->mapper->expects($this->once())
            ->method('update')
            ->with($this->equalTo($updatedNote))
            ->will($this->returnValue($updatedNote));

        $result = $this->service->update(3, 'title', 'content', $this->userId);

        $this->assertEquals($updatedNote, $result);
    }


    /**
     * @expectedException OCA\OwnCollab_TimeTracker\Service\NotFoundException
     */
    public function testUpdateNotFound() {
        // test the correct status code if no event is found
        $this->mapper->expects($this->once())
            ->method('find')
            ->with($this->equalTo(3))
            ->will($this->throwException(new DoesNotExistException('')));

        $this->service->update(3, 'title', 'content', $this->userId);
    }

}
