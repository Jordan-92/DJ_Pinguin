import { create } from "zustand";

interface SelectModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSelectModal = create<SelectModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSelectModal;
