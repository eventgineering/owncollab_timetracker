<?php
namespace OCA\OwnCollab_TimeTracker\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;

use OCA\OwnCollab_TimeTracker\Service\ClientService;

class ClientController extends Controller {

    private $service;
    private $userId;

    use Errors;

    public function __construct($AppName, IRequest $request,
                                ClientService $service, $UserId){
        parent::__construct($AppName, $request);
        $this->service = $service;
        $this->userId = $UserId;
    }

    /**
     * @NoAdminRequired
     */
    public function index() {
        $params = ['clients' => $this->service->findAll()];
        return new TemplateResponse('owncollab_timetracker', 'main', $params);  // templates/main.php
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
     */
    public function create($name) {
        return $this->service->create($name);
    }

    /**
     * @NoAdminRequired
     *
     * @param int $id
     * @param string $name
     */
    public function update($id, $name) {
        return $this->handleNotFound(function () use ($id, $name) {
            return $this->service->update($id, $name);
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
