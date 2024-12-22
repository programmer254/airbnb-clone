// A HOOK THAT CONTROLS WHETHER OUR MODEL IS OPEN OR CLOSED
import {create} from 'zustand'

// CREATING STORE INTERFACE
interface LoginModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) =>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useLoginModal;