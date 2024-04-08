import React from 'react';
import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const TextDisplayer = ({ item, onDoubleClick, displayContent }) => {
    const partialContent = `${item.content.substring(0, 100)}...`; // Adjust the number based on your needs

    return (
        <Box sx={{ cursor: 'pointer' }}
            onDoubleClick={onDoubleClick}>
            <Box>
                <Typography variant="body2" gutterBottom>
                    {displayContent ? item.content : partialContent}
                </Typography>
            </Box>
            <Typography variant="caption" display="block" gutterBottom>
                {item.date}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" gutterBottom>
                {item.description}
            </Typography>
    
            {/* <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                        {item.title}
                    </Typography>
                    <Typography id="modal-modal-date" variant="caption" display="block" gutterBottom>
                        {item.date}
                    </Typography>
                    <Box sx={{}}>
                        <Typography id="modal-modal-description" variant="body1"  >
                            {item.content}
                        </Typography>
                    </Box>
                   
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton aria-label="like"><FavoriteBorderIcon /></IconButton>
                        <IconButton aria-label="comment"><CommentIcon /></IconButton>
                        <IconButton aria-label="more"><MoreHorizIcon /></IconButton>
                    </Box>
                </Box>
            </Modal> */}
        </Box>
    );
};

export default TextDisplayer;
