import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
    Input: componentLoader.add('Input', '../components/Input/Input'),
}

export { componentLoader, Components }