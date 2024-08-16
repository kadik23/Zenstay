import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from 'axios';
import useAlertMessageStore from './useAlertMessage';

const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
            checkUserStatus: async () => {
                try {
                    const response = await axios.get('/me', {
                        withCredentials: true,
                    });
                    if (response.status !== 200 || !response.data.isValid) {
                        set({ user: null });
                        sessionStorage.removeItem('user_credentials');
                    }
                } catch (error) {
                    set({ user: null });
                    sessionStorage.removeItem('user_credentials');
                }
            },
            register: async (state) => {
                const { setAlert, clearAlert } = useAlertMessageStore.getState();

                try{
                    let data = await axios.post('/register',{
                        username:state.username,email:state.email,firstname:state.firstname,lastname:state.lastname,password:state.password
                    })
                    setAlert({ message: 'Registration successful , Now you can log in!', type: 'success' });
                    set({ user: response.data });
                    setTimeout(() => {
                        clearAlert()
                        window.location.href = '/LogIn';
                    }, 3000)
                }catch(e){
                    console.log(e)
                    alert('Registration failed. Please try again later')
                }
            },
            login: async (state) => {
                const { setAlert, clearAlert } = useAlertMessageStore.getState();
                try{
                    let response = await axios.post('login',{
                        email: state.email ,
                        password: state.password
                    })
                    setAlert({ message: 'Login successful!', type: 'success' });
                    set({ user: response.data });
                    setTimeout(() => {
                        clearAlert()
                        window.location.href = '/';
                    }, 3000)
                }catch(e){
                    setAlert({ message: 'Login failed!', type: 'danger' });
                }
            },
            logout: async () => {
                const { setAlert,clearAlert } = useAlertMessageStore.getState();
                try{
                    let data = await axios.post('/logout')
                    if(data.status === 200){
                        set({ user: null });
                        setAlert({ message: 'Logout successful!', type: 'success' });
                        setTimeout(() => clearAlert(), 3000)
                    }
                    return true
                }catch(e){
                    console.log(e)
                    setAlert({ message: 'Logout failed. Please try again later!', type: 'success' });
                    return false
                }
            },
            update: async () => {
                try{
                    console.log(get().user)
                    let data = await axios.put('/update_profile',get().user)
                    if(data.status === 200){
                        alert('Updated successful.')
                    }
                    return true
                }catch(e){
                    console.log(e)
                    alert('Update failed. Please try again later')
                    return false
                }
            },
        }),
        {
            name: 'user_credentials',
            storage: createJSONStorage(() => sessionStorage),
        },
    ));

export default useUserStore;