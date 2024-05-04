export default function ToastInfo({texto}) {

    return (
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <img src="./img/logo.png" class="rounded me-2" alt="logo" />
            <strong class="me-auto">Informação</strong>
            <small>Importante!</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"/>
          </div>
          <div class="toast-body">
            {texto}
          </div>
        </div>
      </div>
    );
  }
  