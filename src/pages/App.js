import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import {Container} from './styles'

import {api} from '../services/api'

function App() {

  const [repo, setRepo] = useState([])
  const [currentRepo, setCurrentRepo] = useState('')

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if (data.id) {
      const isExist = repo.find(repo => repo.id === data.id)

      if (!isExist) {
        setRepo(prev => [...prev, data])
        setCurrentRepo('')
        return
      }
    } else {
      alert('Repositório não encontrado')
    }
  }

  const handleRemoveRepo = (id) => {
    const remove = repo.filter((repo) => repo.id !== id);
    setRepo(remove);
  }

  return (
    <Container>
      <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' width={90} height={90} />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo} />
      {repo.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;