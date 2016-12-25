<?php
namespace OCA\OwnCollab_TimeTracker\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Controller;

use OCA\OwnCollab_TimeTracker\Service\ProjectService;

class ProjectController extends Controller {

    private $service;
    private $userId;

    use Errors;

    public function __construct($AppName, IRequest $request,
                                ProjectService $service, $UserId){
        parent::__construct($AppName, $request);
        $this->service = $service;
        $this->userId = $UserId;
    }

    /**
     * @NoAdminRequired
     */
    public function json() {
	return new JSONResponse($this->service->findAll());
    }

    /**
     * @NoAdminRequired
     */
    public function index() {
	return new DataResponse($this->service->findAll());
    }

    /**
     * @NoAdminRequired
     *
     * @param int $id
     */
    public function show($id) {
        return $this->handleNotFound(function () use ($id) {
            return $this->service->find($id);
        });
    }

    /**
     * @NoAdminRequired
     *
     * @param string $name
     * @param string $clientid
     */
    public function create($name, $clientid) {
        return $this->service->create($name, $clientid);
    }

    /**
     * @NoAdminRequired
     *
     * @param int $id
     * @param string $name
     * @param string $clientid
     */
    public function update($id, $name, $clientid) {
        return $this->handleNotFound(function () use ($id, $name, $clientid) {
            return $this->service->update($id, $name, $clientid);
        });
    }

    /**
     * @NoAdminRequired
     *
     * @param int $id
     */
    public function destroy($id) {
        return $this->handleNotFound(function () use ($id) {
            return $this->service->delete($id);
        });
    }

}
