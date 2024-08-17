//import CommitmentEvaluation from '../models/CommitmentEvaluation.js';
import CommitmentEvaluation from '../models/commitment_evaluationsModel.js';

// Obtener todos los registros de compromisos
export const readCommitments = async (req, res) => {
    try {
        const commitments = await CommitmentEvaluation.findAll();
        res.json(commitments);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los compromisos' });
    }
};

// Obtener un registro específico por su ID
export const readCommitmentById = async (req, res) => {
    try {
        const commitment = await CommitmentEvaluation.findByPk(req.params.id);
        if (commitment) {
            res.json(commitment);
        } else {
            res.status(404).json({ error: 'Compromiso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el compromiso' });
    }
};

// Crear un nuevo registro
export const createCommitment = async (req, res) => {
    try {
        const newCommitment = await CommitmentEvaluation.create(req.body);
        res.status(201).json(newCommitment);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el compromiso' });
    }
};

// Actualizar un registro existente
export const updateCommitment = async (req, res) => {
    try {
        const [updated] = await CommitmentEvaluation.update(req.body, {
            where: { eval_id: req.params.id }
        });
        if (updated) {
            const updatedCommitment = await CommitmentEvaluation.findByPk(req.params.id);
            res.json(updatedCommitment);
        } else {
            res.status(404).json({ error: 'Compromiso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el compromiso' });
    }
};

// Eliminar un registro
export const deleteCommitment = async (req, res) => {
    try {
        const deleted = await CommitmentEvaluation.destroy({
            where: { eval_id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Compromiso eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Compromiso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el compromiso' });
    }
};
