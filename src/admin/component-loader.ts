import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
    Input: componentLoader.add('Input', '../components/Input/Input'),
    CKEditor: componentLoader.add('CKEditor', '../components/CKEditor/CKEditor'),
}

export { componentLoader, Components }