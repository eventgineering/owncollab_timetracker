<?php
namespace OCA\OwnCollab_TimeTracker\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;

use OCA\OwnCollab_TimeTracker\Service\EventService;

class EventController extends Controller {

    private $service;
    private $userId;

    use Errors;

    public function __construct($AppName, IRequest $request,
                                EventService $service, $UserId){
        parent::__construct($AppName, $request);
        $this->service = $service;
        $this->userId = $UserId;
    }

    /**
     * @NoAdminRequired
     */
    public function index() {
        return new DataResponse($this->service->findAll($this->userId));
    }

    /**
     * @NoAdminRequired
     *
     * @param int $id
     */
    public function show($id) {
        return $this->handleNotFound(function () use ($id) {
            return $this->service->find($id, $this->userId);
        });
    }

    /**
     * @NoAdminRequired
     *
     * @param string $title
     * @param string $content
     * @param string $start
     * @param string $end
     */
    public function create($title, $content, $start, $end) {
        return $this->service->create($title, $content, $start, $end, $this->userId);
    }

    /**
     * @NoAdminRequired
     *
     * @param int $id
     * @param string $title
     * @param string $content
     * @param string $start
     * @param string $end
     */
    public function update($id, $title, $content, $start, $end) {
        return $this->handleNotFound(function () use ($id, $title, $content, $start, $end) {
            return $this->service->update($id, $title, $content, $start, $end, $this->userId);
        });
    }

    /**
     * @NoAdminRequired
     *
     * @param int $id
     */
    public function destroy($id) {
        return $this->handleNotFound(function () use ($id) {
            return $this->service->delete($id, $this->userId);
        });
    }

}