import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from 'axios';

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
                try{
                    let data = await axios.post('/register',{
                        username:state.username,email:state.email,firstname:state.firstname,lastname:state.lastname,password:state.password
                    })
                    alert('Registration successful. Now you can log in')
                    set({ user: response.data });
                    console.log(get().user)
                }catch(e){
                    console.log(e)
                    alert('Registration failed. Please try again later')
                }
            },
            login: async (state) => {
                try{
                    let response = await axios.post('login',{
                        email: state.email ,
                        password: state.password
                    })
                    alert('Login successful');
                    set({ user: response.data });
                    window.location.href = '/';
                }catch(e){
                    alert('Login failed');
                }
            },
            logout: async () => {
                try{
                    let data = await axios.post('/logout')
                    if(data.status === 200){
                        set({ user: null });
                        alert('Logout successful.')
                    }
                    return true
                }catch(e){
                    console.log(e)
                    alert('Logout failed. Please try again later')
                    return false
                }
            }
        }),
        {
            name: 'user_credentials',
            storage: createJSONStorage(() => sessionStorage),
        },
    ));

export default useUserStore;