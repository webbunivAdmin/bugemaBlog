import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useStore from "../store";
import { useState } from "react";


export const usePosts = ({writerId}) => {
    const {setIsLoading } = useStore();

    const location = useLocation();
    const navigate = useNavigate();

    const [ searchParams ] = useSearchParams();

    const [page, setPage] = useState(searchParams.get("page") || 1);
    const [category, setCategory ] = useState(searchParams.get("cat") || null);

    const [posts, setPosts] = useState([]);
    const [numOgPages, setNumberOfPages] = useState(1);

    useEffect(()=> {
        const fetchPosts = async() => {
            updateUrl
        }
    }, []);
};