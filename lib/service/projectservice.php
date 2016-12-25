<?php
namespace OCA\OwnCollab_TimeTracker\Service;

use Exception;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

use OCA\OwnCollab_TimeTracker\Db\Project;
use OCA\OwnCollab_TimeTracker\Db\ProjectMapper;


class ProjectService {

    private $mapper;

    public function __construct(ProjectMapper $mapper){
        $this->mapper = $mapper;
    }

    public function findAll() {
        return $this->mapper->findAll();
    }

    private function handleException ($e) {
        if ($e instanceof DoesNotExistException ||
            $e instanceof MultipleObjectsReturnedException) {
            throw new NotFoundException($e->getMessage());
        } else {
            throw $e;
        }
    }

    public function find($id) {
        try {
            return $this->mapper->find($id);

        // in order to be able to plug in different storage backends like files
        // for instance it is a good idea to turn storage related exceptions
        // into service related exceptions so controllers and service users
        // have to deal with only one type of exception
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }

    public function create($name) {
        $project = new Project();
        $project->setName($name);
        return $this->mapper->insert($project);
    }

    public function update($id, $name, $clientid) {
        try {
            $project = $this->mapper->find($id);
            $project->setName($name);
            return $this->mapper->update($project);
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }

    public function delete($id) {
        try {
            $project = $this->mapper->find($id);
            $this->mapper->delete($project);
            return $project;
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }

}
