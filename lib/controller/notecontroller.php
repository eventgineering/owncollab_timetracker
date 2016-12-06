<?php
namespace OCA\OwnNotes\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;

use OCA\OwnNotes\Service\NoteService;

class NoteController extends Controller {

    private $service;
    private $userId;

    use Errors;

    public function __construct($AppName, IRequest $request,
                                NoteService $service, $UserId){
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
     * @param string $startts
     * @param string $endts
     */
    public function create($title, $content, $startts, $endts) {
        return $this->service->create($title, $content, $startts, $endts, $this->userId);
    }

    /**
     * @NoAdminRequired
     *
     * @param int $id
     * @param string $title
     * @param string $content
     * @param string $startts
     * @param string $endts
     */
    public function update($id, $title, $content, $startts, $endts) {
        return $this->handleNotFound(function () use ($id, $title, $content, $startts, $endts) {
            return $this->service->update($id, $title, $content, $startts, $endts, $this->userId);
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
