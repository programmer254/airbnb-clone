"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { BsTranslate } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel
}) => {

  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  // Previous and Next button in our Modal
  const handleSecondaryAction = useCallback(() => {
    if (disabled || secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction])

  if (!isOpen) {
    return null;
  }


  return (
    <>

      {/* MODAL OVERLAY */}
      <div className='
    justify-center
    flex
    items-center
    bg-neutral-800/70
    fixed
    inset-0
    outline-none
    focus:outline-none
    overflow-x-hidden
    overflow-y-auto
    z-50
    '
      >

        {/* MODAL CONTAINER */}
        <div className='
      relative
      w-full
      md:w-4/6
      lg:w-3/6
      xl:w-2/5
      my-6
      mx-auto
      h-full
      lg:h-auto
      md:h-auto
      '
        >
          {/*MODAL CONTENT ANIMANTION */}
          <div className={
            `translate
          duration-300
          h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}

          `
          }
          >

            {/* MODAL CONTENT */}
            <div className='
            translate
            h-full
            lg:h-auto
            md:h-auto
            border-0
            rounded-lg
            shadow-lg
            relative
            flex
            flex-col
            w-full
            bg-white
            outline-none
            focus:outline-none
            '>

              {/* NOW STARTING TO SEE THINGS ON THE SCREEN */}

              {/* HEADER */}



              <div className='
            flex
            items-center
            p-6
            rounded-t
            justify-center
            relative
            border-b-[1px]
            '>

                <button
                  onClick={handleClose}
                  className='
            p-1
            border-0
            hover:opacity-70
            transition
            absolute
            left-9
            '
                >
                  <IoMdClose size={18} />
                </button>
                <div className='text-lg font-semibold'>
                  {title}
                </div>
              </div>
              {/* BODY */}
              <div className='relative p-6 flex-auto'>
                {/* Body element which we will pass from other components */}
                {body}
              </div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className='
                flex
                flex-row
                items-center
                gap-4
                w-full'
                >
                  
                  {/* THIS WILL BE OUR SECONDARY ACTION BUTTON */}
                  {/* <Button icon={IoMdClose} label="My Button"/> */}
                  {secondaryAction && secondaryActionLabel && (
                  <Button 
                  outline
                  disabled={disabled}
                  label={secondaryActionLabel}
                  onClick={handleSecondaryAction}
                 />
                 )}

                  {/* THIS WILL BE OUR PRIMARY ACTION BUTTON */}

                  <Button 
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                  />

                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
