<?php
namespace OCA\OwnCollab_TimeTracker\Service;

use Exception;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

use OCA\OwnCollab_TimeTracker\Db\Job;
use OCA\OwnCollab_TimeTracker\Db\JobMapper;


class JobService {

    private $mapper;

    public function __construct(JobMapper $mapper){
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

    public function create($name, $rate, $currency) {
        $job = new Job();
        $job->setName($name);
        $job->setRate($rate);
        $job->setCurrency($curency);
        return $this->mapper->insert($job);
    }

    public function update($id, $name, $rate, currency) {
        try {
            $job = $this->mapper->find($id);
            $job->setName($name);
            $job->setRate($rate);
            $job->setCurrency(currency);
            return $this->mapper->update($job);
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }

    public function delete($id) {
        try {
            $job = $this->mapper->find($id);
            $this->mapper->delete($job);
            return $job;
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }

}
