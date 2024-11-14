import React, { useState, useEffect } from "react";
import { CardProfile } from "../../components/UI/CardProfile";
import { CardTasks } from "../../components/UI/CardTasks";
import { useEditProfile } from "../hooks/useModal";
import { ModalButtons } from "../../components/UI/ModalButtons";
import EditProfileModal from "./EditProfileContent";

export function ProfileContent({ img, name, lastName1, lastName2, mail, usr, taskCompleted, taskRemaining, courses }) {
  const { editModalIsOpen, closeEditModal, handleEditProfileClick } = useEditProfile();
  const [profileInfo, setProfileInfo] = useState({});
  const [info, setInfo] = useState([]);

  const token = localStorage.getItem('token');

  const fetchProfileInfo = async () => {
    try {
      const response = await fetch('https://attimo-backend.vercel.app/public/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const response2 = await fetch('https://attimo-backend.vercel.app/public/api/user/courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      const data2 = await response2.json();

      setProfileInfo(data);
      setInfo(data2);
    } catch (error) {
      console.error('Error fetching profile information:', error);
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  return (
    <>
      <div>
        <CardProfile
          img={profileInfo.image}
          name={profileInfo.name}
          lastName1={profileInfo.lastname1}
          lastName2={profileInfo.lastname2}
          mail={profileInfo.email}
          usr={profileInfo.username}
        />

        <CardTasks
          taskCompleted={taskCompleted}
          taskRemaining={taskRemaining}
          courses={info} 
        />

        <div className='justify-center flex'>
          <ModalButtons onClick={() => { handleEditProfileClick(); }} text="Edit Profile" />
        </div>

        <EditProfileModal isOpen={editModalIsOpen} onClose={closeEditModal} profileInfo={{ img, name, lastName1, lastName2, mail, usr }} />
      </div>
    </>
  );
}
