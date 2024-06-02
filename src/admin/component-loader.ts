import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
    Input: componentLoader.add('Input', '../components/Input/Input'),
    Editor: componentLoader.add('Editor', '../components/Editor/Editor'),
    // other custom components
}

export { componentLoader, Components }