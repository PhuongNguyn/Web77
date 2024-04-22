import { Modal, Button } from "antd"
import { useEffect, useRef, useState } from "react"

const ModalUploadUserAvatar = ({ isOpen, handleCancel, handleUploadFile }) => {
    const [file, setFile] = useState(null)
    const ref = useRef()

    useEffect(() => {
        if (!isOpen) {
            setFile(null)
            if (ref.current)
                ref.current.value = ""
        }
    }, [isOpen])
    return (
        <Modal
            title="Cập nhật hình đại diện người dùng"
            open={isOpen}
            onCancel={handleCancel}
            okButtonProps={{ style: { display: "none" } }}
            cancelButtonProps={{ style: { display: "none" } }}
        >
            <input type="file" ref={ref} onChange={(e) => { setFile(e.target.files[0]) }} />
            <Button type="primary" onClick={() => handleUploadFile(file)}>Upload</Button>
        </Modal>
    )
}

export default ModalUploadUserAvatar