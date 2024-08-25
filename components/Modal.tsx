// Modal.tsx
interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative bg-white p-6 rounded-lg shadow-lg">
        <label
          onClick={() => setModalOpen(false)}
          className="absolute right-2 top-2 bg-red-500 text-white hover:bg-red-600 py-1 px-2 rounded cursor-pointer"
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;
