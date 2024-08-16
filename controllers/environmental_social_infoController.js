import environmental_social_info from '../models/environmental_social_info.js';

// Obtener todos los registros de información ambiental y social
export const readEnvironmentalSocialInfo = async (req, res) => {
    try {
        const info = await environmental_social_info.findAll();
        res.json(info);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la información ambiental y social' });
    }
};

// Obtener un registro específico por su ID
export const readEnvironmentalSocialInfoById = async (req, res) => {
    try {
        const info = await environmental_social_info.findByPk(req.params.id);
        if (info) {
            res.json(info);
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el registro' });
    }
};

// Crear un nuevo registro
export const createEnvironmentalSocialInfo = async (req, res) => {
    try {
        const newInfo = await environmental_social_info.create(req.body);
        res.status(201).json(newInfo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el registro' });
    }
};

// Actualizar un registro existente
export const updateEnvironmentalSocialInfo = async (req, res) => {
    try {
        const updatedInfo = await environmental_social_info.update(req.body, {
            where: { env_soc_info_id: req.params.id }
        });
        if (updatedInfo[0] === 1) {
            res.json({ message: 'Registro actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el registro' });
    }
};

// Eliminar un registro
export const deleteEnvironmentalSocialInfo = async (req, res) => {
    try {
        const result = await environmental_social_info.destroy({
            where: { env_soc_info_id: req.params.id }
        });
        if (result === 1) {
            res.json({ message: 'Registro eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el registro' });
    }
};
