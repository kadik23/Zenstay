import useUserStore from '../Hooks/useUserStore';

export const getAuthHeader = () => {
    const currentUser = useUserStore.getState().user;
    return currentUser?.token ? { Authorization: `Bearer ${currentUser.token}` } : {};
};
