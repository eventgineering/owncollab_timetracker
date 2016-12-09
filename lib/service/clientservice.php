<?php
namespace OCA\OwnCollab_TimeTracker\Service;

use Exception;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

use OCA\OwnCollab_TimeTracker\Db\Client;
use OCA\OwnCollab_TimeTracker\Db\ClientMapper;


class ClientService {

    private $mapper;

    public function __construct(ClientMapper $mapper){
        $this->mapper = $mapper;
    }

    public function getAll() {
        return $this->mapper->getAll();
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
        $client = new Client();
        $client->setName($name);
        return $this->mapper->insert($client);
    }

    public function update($id, $name) {
        try {
            $client = $this->mapper->find($id);
            $client->setName($name);
            return $this->mapper->update($client);
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }

    public function delete($id) {
        try {
            $client = $this->mapper->find($id);
            $this->mapper->delete($client);
            return $client;
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }

}
